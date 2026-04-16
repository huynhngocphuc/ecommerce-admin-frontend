# Localization Notes (Admin)

## Scope Implemented
- Added i18n initialization and locale resources for `en` and `vi`.
- Added persistent language preference using `admin_app.language`.
- Added admin header language switcher (`EN`/`VI`).
- Localized scoped admin UI:
  - Sidebar labels and drawer controls.
  - Navbar profile and logout labels.
  - Dashboard static labels.
  - Products management static labels:
    - Page title/subtitle and create button.
    - Product table headers/status/empty state.
    - Filter bar labels/options/action buttons.
    - Product form labels/helper texts.
    - Product form dialog labels and validation messages.
    - Delete dialog labels and confirmation text.

## Fallback Behavior
- Default language: `vi`.
- Fallback language: `en`.
- Runtime i18n error handler switches to fallback when resource errors occur.

## Notes
- Existing project warnings unrelated to i18n remain (unused variables in pre-existing files).
- `npm run build` succeeds.

## Pending Manual Validation
- Rapid language toggle behavior.
- Cross-app preference isolation checks in browser.
- Edge-case fallback simulation for missing keys/resources.
