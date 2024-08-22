class FileSystem {
    save(data) {
        // save data to the file system
    }
}

class ExternalDB {
    save(data) {
        // save data to an external database
    }
}

class LocalStorage {
    save(data) {
        // save data to local storage
    }
}

class Repository {
    save(data, storage) {
        storage.save(data);
    }
}

// use case
const fileSystem = new FileSystem();
const repository = new Repository();

repository.save('some data', fileSystem);
