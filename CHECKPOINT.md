# Delivery checkpoint — aggregate reasons revision

- 14 slides: added child reasons, maternal reasons, and village follow-up; conclusion now gives practical village actions, not a system roadmap.
- Fresh read-only PostgreSQL extraction on 1 October 2026: non-deleted records created June–August 2026 in WITA; transaction BEGIN READ ONLY / ROLLBACK. No VPS, configuration or database mutations.
- Public reasons file strictly category/count/scope/denominator. JSON reason arrays categorized by regex, DISTINCT record count per category; no raw reasons, identifiers, values, villages or severity subgroups exported.
- Child: 6/147 flagged (LiLA 5, age 1). Mother: 16/33 flagged (IMT 11, blood pressure 11, LiLA 1; overlapping); 2 flagged maternal records have systolic below diastolic and need verification, not diagnosis. Hb: 6/36 warning/critical, broader grouping only.
- Reason figures show current flags, not history; not linked to month/role filters. Hb six is not the full 38 yellow / 39 red across services.
- PASS tsc, build, actual Chromium tests on 390x844 and 1280x800: all14 slides, category clicks including every detail state, filters/navigation/build/grid/rail; zero console/page errors and zero content overflow.
- PASS tracked privacy scan and byte-identical original deck engine/base.css. New aggregate schema asserted in tests.
- Privacy scanner initially matched an ordinary Indonesian color word against a source account name; rephrased the chart description, reran successfully. No identity was published.
- TEST-RESULTS.json contains actual local browser output. Public deployment/readback handled after push; no pixel-level visual review claimed.
