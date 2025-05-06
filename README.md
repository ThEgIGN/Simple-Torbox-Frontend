## Important note: I'm not currently working on this project. This small project was made as a showcase of my React knowledge. My intention was never for this to become an alternative for Torbox. It was made purely for fun. 😊

### Important note 2: The application uses [thingproxy](https://github.com/Freeboard/thingproxy) for all API calls because of CORS. I highly recommend setting up a local proxy for security reasons and reliability (sometimes thingproxy bugs out, and you might get an "Unknown error (Probably CORS)" error)

Simple frontend for Torbox made in React, using Torbox API. Currently, it only supports torrents. (No queued torrents though)

[Torbox](https://torbox.app/) is a service that allows you to download torrents from your browser. It has a cache system, where torrents are kept for 30 days. Meaning, if one user downloads a torrent, other users can access that same torrent immediately through the cache system.

The application has a simple Login page where users have to put their API key in order for the service to work properly.

The dashboard shows all torrents related to the user. Torrents are grouped into three sections:

1. Active (torrents that are downloading/uploading/processing...)
2. Cached (torrents in cache system)
3. Inactive (torrents that haven't been downloaded for 30 days and are thus removed from the cache system)

Users can click on torrents in order to show their contents. This is only available for torrents that are either cached or currently seeding.

Users can delete torrents by clicking on the appropriate button. They can also either copy download links or download files directly.

The navigation bar has four functionalities:

1. Add torrents (users can add multiple magnet links which will all be processed sequentially)
2. Search bar (users can search for specific torrents)
3. Sort (users can sort torrents by their names, sizes and dates added)
4. Profile info (shows little info about users' stats)
   1. Download magnet links (downloads txt file with magnet links of users torrents)
   2. Logout
   
Below is a demo of the application using torrents from [LinuxTracker](https://linuxtracker.org/).



https://github.com/user-attachments/assets/64054ae4-d622-4971-bebb-04aa83fb590f

