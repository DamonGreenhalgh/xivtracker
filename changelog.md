# Changelog
All changes following 1.0.0 will be documented within this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Unreleased

## [1.2.0] - 2022-03-28

Support for **Final Fantasy XIV** patch 6.1 *Newfound Adventure*.

### Added

- Added '**Reference Character**' feature. This feature allows users to reference a character. Some systems change their behaviour based on the progress the reference character has made within the game.
    - Content that the reference character has not completed will be blurred.
    - Current splash art will be associated with reference character expansion progress.
- Added **Achievements** feature. This feature allows users to view a character's achievements within the game.
- Added *completion* metric to mounts, minions, job and achievements(points).
- Added **Splash Art** background.
- Added custom checkbox component.
- Reintroduced character banner at the top of the character page.
- Reintroduced **Profile** feature.
- Added **OCE** servers to server list.

### Changed

- Banner component refactor.
- Job item refactor.
- Changed tooltips to now display item level, main stats and bonuses.
- Changed profile to now include currently active job, experience and level.
- Changed job items to show current/max experience points.
- Changed profile page layout.
- Featured component now displays time relevant content (duration/release date)
- Changed server text to now display a diamond next to it.

### Fixed

- Fixed completion bars being full when at 0% completion.
- Fixed page not loading to a new character when selected from the recent panel while on the character page.
- Fixed job level text not displaying the correct colour when at max level.
- Fixed splash element extending beyond the page.

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