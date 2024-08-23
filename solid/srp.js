const fs = require('node:fs/promises');

class TodoList {
    constructor() {
        this.items = [];
    }

    addItem(text) {
        this.items.push(text);
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }
}

class DataTransformer {
    serialize(data) {
        return JSON.stringify(data);
    }

    deserialize(data) {
        return JSON.parse(data);
    }
}

class Repository {
    constructor(fs, data, dataTransformer) {
        this.fs = fs;
        this.data = data;
        this.dataTransformer = dataTransformer;
    }

    async save(filename) {
        try {
            const content = this.dataTransformer.serialize(this.data.items);
            await this.fs.writeFile(filename, content);
            console.log(`file ${filename} written successfully`);
        } catch (err) {
            console.error(`error writing file ${filename}:`, err);
        }
    }

    async load(filename) {
        try {
            const content = await this.fs.readFile(filename, 'utf-8');

            if (content) {
                const data = this.dataTransformer.deserialize(content);
                this.data.items = Array.isArray(data) ? data : [];
            } else {
                this.data.items = [];
            }

            console.log(`file ${filename} loaded successfully`);
        } catch (err) {
            console.error(`error loading file ${filename}:`, err);
            this.data.items = [];
        }
    }
}