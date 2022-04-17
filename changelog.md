# Changelog
All changes following 1.0.0 will be documented within this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Unreleased

## [1.2.1] - 2022-04-17

Cleaning up patch. Fixes and mobile support.

### Changes

- Added media queries for multiple components. Support for mobile.
- Featured events link now open a new tab.

### Fixed
- Quests not appearing when reference character data was not updating.
- Fixed failed search when using the searchbar within a character profile.


## Released

## [1.2.0] - 2022-04-16

This release contains various new features and support for **Final Fantasy XIV** patch **6.1** '*Newfound Adventure*'.

### Added

- Added **Reference** feature. Users can select a character to reference. The following features can be applied with a valid reference character.
    - ***Safe Mode*** - hide activities that the reference character has not yet completed.
    - ***Background Parody*** - automatically select the appropriate background based on the reference character's progress in the story.
- Added **Achievements** feature. Displays all achievements aquired by a character.
- Added **Completion** metric to mounts, minions, job and achievements.
- Added multiple **Splash Art** backgrounds to customize the appearance of the app.
- Reintroduced **Profile** feature.
- Added **OCE** servers to server list.
- Added content support for **Final Fantasy XIV** patch **6.1** '*Newfound Adventure*'. New entries have been added to the **Quests** section.
- Added content support for current live events.

### Changed

- Changed **Tooltips** to now display *item level, main stats* and *bonuses*.
- Changed **Profile Display** to now include currently *active job, experience* and *level*.
- Changed **Jobs** to show *current/max* experience points.
- Changed **Page Layout**. Instead of a single page, content is contained within panels.
- Changed **Featured** to now display time relevant content (duration/release date)

### Fixed

- Fixed completion bars being full when at 0% completion.
- Fixed page not loading to a new character when selected from the recent panel while on the character page.
- Fixed job level text not displaying the correct colour when at max level.
- Fixed splash element extending beyond the page.

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