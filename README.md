# Odin-drive for The Odin Project

Barebones Google drive clone developed as part of an assignment for The Odin Project.
Users are able to add files to a Supabase bucket and create files on a database. The files can be downloaded, renamed, or deleted.
Users can also create, rename, and delete folders.
An account has to be created in order for a user to add files and folders.
There is currently no error handling.

## Installation

1. Clone the repo.
2. 3 environment variables must be provided in order for it to work:
   - A "DATABASE_URL"
   - A "SESSION_SECRET"
   - A "SUPABASE_API_KEY"

# ToDo

Have to add error handling.
Folder ID's should be UUID's but all the ID checking would also have to check for a string instead of an int.
