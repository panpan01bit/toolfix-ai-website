#!/usr/bin/env bash
# Re-encode the green-screen product recordings into brand-composited web video.
# The originals are 1462x806 @120fps .mov files shot on a flat green backdrop
# (rgb 102,127,73). We key the backdrop out, grade the dim UI for legibility,
# and composite on the site's dark surface colour (#0E1526) so the clips blend
# seamlessly into the product sections.
set -euo pipefail

SRC="/Users/2/Downloads/mvp-SASS-视频素材（软件录屏）"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VID="$ROOT/public/media/video"
POSTER="$ROOT/public/media/poster"
mkdir -p "$VID" "$POSTER"

# slug|source file|poster timestamp (seconds)
CLIPS=(
  "ai-diagnosis|AI自动售后对话.mov|14.2|1048:700:194:46|1188:794"
  "human-handover|AI 与人工无缝接管.mov|12.7|1084:680:178:58|1264:794"
  "token-link|专属售后链接.mov|7.6|1028:600:194:118|1284:750"
  "pdf-parsing|PDF上传与智能解析.mov|9.5|1128:684:146:54|1308:792"
  "knowledge-base|知识库管理.mov|7.0|1068:708:186:42|1196:794"
  "grounded-answers|知识检索与可靠回答.mov|9.0|1068:644:186:78|1316:794"
  "brand-voice|AI 身份与品牌语气.mov|12.1|1040:592:198:126|1300:740"
  "merchant-brand|商家品牌信息.mov|8.7|1048:608:194:110|1310:760"
  "multilingual|四语言无缝切换.mov|11.4|960:652:246:70|1168:794"
  "customers-sessions|客户与会话管理.mov|2.4|1068:652:186:70|1300:794"
  "service-dashboard|服务数据概览.mov|2.0|1092:676:174:54|1282:792"
  "chrome-workbench|chrome 扩展快捷工作台.mov|4.5|660:692:474:50|756:792"
  "signup-verification|注册与邮箱验证.mov|7.1|904:672:246:42|1068:794"
  "login-console|登陆工作台.mov|6.0|884:640:362:74|1096:794"
  "password-reset|找回与重制密码.mov|10.5|924:676:246:42|1084:792"
)

# key + grade + composite onto flat brand surface
grade="trim=start=1.2,setpts=PTS-STARTPTS,format=rgb24,colorkey=0x667F49:0.10:0.02,colorlevels=rimin=0.338:rimax=0.503:gimin=0.338:gimax=0.503:bimin=0.345:bimax=0.512,eq=saturation=1.02,scale=1440:794:flags=lanczos"
# per-clip crop (w:h:x:y in 1440x794 space) keeps the app window filling the frame

for entry in "${CLIPS[@]}"; do
  IFS='|' read -r slug file ts crop target <<<"$entry"
  in="$SRC/$file"
  out="$VID/$slug.mp4"
  echo "==> $slug  <-  $file"
  ffmpeg -hide_banner -loglevel error -y -i "$in" \
    -filter_complex "[0:v]$grade,crop=$crop,scale=$target:flags=lanczos,pad=1440:794:(ow-iw)/2:(oh-ih)/2:color=0x0E1526,format=rgba[fg];color=c=0x0E1526:s=1440x794:r=30:d=30[bg];[bg][fg]overlay=shortest=1:format=auto,format=yuv420p[out]" \
    -map "[out]" -r 30 -c:v libx264 -profile:v high -level 4.0 -crf 23 -preset slow \
    -movflags +faststart -an "$out"

  # poster frame straight from the encoded clip, so it always matches playback
  ffmpeg -hide_banner -loglevel error -y -ss "$ts" -i "$out" -frames:v 1 -q:v 3 "$POSTER/$slug.jpg"

  printf '    video %8s  poster %8s\n' "$(du -h "$out" | cut -f1)" "$(du -h "$POSTER/$slug.jpg" | cut -f1)"
done

echo "done"
