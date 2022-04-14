# Changelog
All changes following 1.0.0 will be documented within this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Unreleased

## [1.1.1] - 2022-03-28

### Added

- Added character banner at the beggining of the page.
- Added reference feature. This feature allows the user to save a reference character. Spoiler content will be hidden based on the reference character progress.
- Added job icon to portrait image.
- Added contrast background element.
- Added stats to tooltip component.
- Added completion metric to mounts, minions and jobs.
- Added decorative diamond to server text.
- Added splash background art.
- Added custom checkbox component.
- Added profile information.

### Changed

- Banner component refactor.
- Changed job items to show current / max experience points.

### Removed

- Splash art component. Issues with the theme clashing.

### Fixed

- Fixed completion bars being full when at 0% completion.
- Fixed page not loading to a new character when selected from the recent panel while on the character page.
- Fixed job level text not displaying the correct colour when at max level.

## Released

## [1.1.0] - 2022-03-29

### Added 

- **Themes**, with support for more themes in the future.
- **Light Theme** (new default)
- Settings page, currently only has the option to change theme.
- **Glamour** icon indicator on items with a glamour plate applied.
- Added splash image on homepage, random selection.
- Added **Featured** slideshow on homepage.
- Added **Recent** panel below search bar. Displays the 6 last characters viewed on the browser.
- Use of `localStorage` to remember themes, and recent characters over sessions.
- Support for **Mobile** view.

### Changed 

- Replaced many icon assets with icons from the `react-icons` library.
- Updated navbar, no longer displays avatar of current character.
- Replaced default `<select>` html tag with custom class.
- Introduction of utility classes. Overhaul on many CSS classes.
- Updated quests section.

### Removed

- Many assets now rendered obsolete with the use of `react-icons` library.
- Obsolete CSS classes.