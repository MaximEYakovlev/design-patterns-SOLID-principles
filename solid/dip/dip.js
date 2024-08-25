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

// method parameters injection
// ***************************
class Repository {
    save(data, storage) {
        storage.save(data);
    }
}

// use case
const fileSystem = new FileSystem();
const repository = new Repository();

repository.save('some data', fileSystem);

// constructor injection
// *********************
class Repository {
    constructor(storage) {
        this.storage = storage;
    }

    save(data) {
        this.storage.save(data);
    }
}

// use case
const fileSystem = new FileSystem();
const repository = new Repository(fileSystem);

repository.save('some data');

