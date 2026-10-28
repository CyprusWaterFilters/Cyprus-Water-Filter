# Homewater website — review notes

Homewater is provisional branding. The business name, public WhatsApp number, service area and preferred language are still awaiting confirmation. Configure these in lib/business.ts; no customer enquiry is sent by the website itself. Once a number is configured, the user opens a prefilled WhatsApp conversation and sends it themselves.

The user confirmed that HFS means HF2-S. The catalogue contains FX-10/15/17, HF2-10/15/17 and HF2-10S/15S/17S. HF2 and HF2-S use intentional typographic model cards pending genuine product photographs; FX uses the three supplied images. The supplied image labels differ from manufacturer specifications, so capacity, flow, certification and health claims have not been copied from them. Verify the supplier's exact SKUs and replace inaccurate product artwork before public launch.

Reference: https://www.getpani.com/ — immersive photography, large direct headlines, product-led storytelling, generous spacing and a strong final call to action. This implementation uses an original water photograph, independent copy and a local enquiry flow.
Manufacturer references:
- https://fluux.co.kr/132 — FX family, nominal 0.1 micron, carbon/membrane filtration.
- https://fluux.co.kr/92 — HF2 and HF2-S family; nominal 0.5 micron, chlorine taste/odour reduction, S scale-inhibition variants.

Original hero image: public/images/water-hero.png. Generated with the built-in image generation tool. Prompt: Wide premium editorial lifestyle photograph of a clear ribbed glass filled with fresh water on pale ice-blue sunlit kitchen stone; water pouring from upper right, subtle blue caustics and Mediterranean morning light, softly defocused foliage far right. Glass on right half, clean negative space on left for navy headline. No people, filter cartridges, text, logos or UI.

The first version is intended for private design review. Metadata prevents indexing. Public launch requires business details and product artwork/specification confirmation.

Hero video update:
- Stock footage: TP Motion, Pexels video 8816380 — https://www.pexels.com/video/pouring-water-on-a-glass-cup-8816380/
- License: https://www.pexels.com/license/ (accessed September 5, 2026); website and marketing use permitted, attribution optional.
- Source download: https://videos.pexels.com/video-files/8816380/8816380-hd_1920_1080_25fps.mp4
- Locally hosted 12-second silent H.264 loop, 1280x720 desktop and 960x540 mobile; fast-start enabled. Poster extracted from the clip. Original download excluded from publishing.
- Reduced motion and data-saving preferences use the poster until the visitor chooses Play. Playback failures retain the poster. A visible pause/play control is available.

Hero redesign after mobile feedback:
- Replaced the split mobile hero with one continuous photographic composition and removed the overlaid caption.
- Desktop preserves the original sunlit photograph. Mobile uses public/images/water-hero-mobile.png, a portrait derivative generated with built-in imagegen from that photograph; clean upper 55%, full ribbed glass lower right, stream entering from the right, same icy blue light and stone. No text or UI generated into the asset.
- Hero-specific styles are scoped in app/hero-refresh.css, independent of earlier hero overrides. Clear primary CTA, concise reassurance, gentle one-time entry animation and reduced-motion handling.
