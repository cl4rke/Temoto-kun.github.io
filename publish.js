/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-05
 */

const fs = require('fs'),
    path = require('path'),
    articlesOutput = 'articles.json',
    outputDir = 'prebuilt',
    inputDir = 'articles',
    inputExt = '.txt',
    inputMetadataExt = '.metadata.json';

function parseContents(contents) {
    let parsed = {
            title: '',
            subtitle: '',
            tags: [],
            content: ['']
        },
        mode = 'title',
        lastChar = null;

    contents = contents
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\t/g, ' ');

    Array
        .from(contents)
        .forEach((lookahead) => {
            if (lookahead === '\n' && lastChar === '\n') {
                switch (mode) {
                    case 'title':
                        parsed.title = parsed.title.trim();
                        mode = 'subtitle';
                        break;
                    case 'subtitle':
                        parsed.subtitle = parsed.subtitle.trim();
                        mode = 'tags';
                        break;
                    case 'tags':
                        parsed.tags = parsed.tags.map(tag => tag.trim());
                        mode = 'content';
                        break;
                    case 'content':
                        parsed.content.push('');
                }
            }

            if (lookahead === '#' && mode === 'tags' && (lastChar === ' ' || lastChar === '\n')) {
                parsed[mode].push('');
                lastChar = lookahead;
                return;
            }

            switch (mode) {
                case 'tags':
                case 'content':
                    parsed[mode][parsed[mode].length - 1] += lookahead;
                    break;
                default:
                    parsed[mode] += lookahead;
                    break;
            }

            lastChar = lookahead;
        });

    parsed.content = parsed.content.map(content => content.trim());

    return parsed;
}

function getFileMetadata(filename, cb) {
    let metadataFilename = path.resolve(inputDir, '.' + path.basename(filename, inputExt) + inputMetadataExt);

    fs.readFile(metadataFilename, (err, res) => {
        let attributes;

        if (err) {
            return fs.stat(filename, (err, res) => {
                if (err) {
                    return cb(err);
                }

                attributes = {
                    datetime: res.birthtime
                };

                fs.writeFile(metadataFilename, JSON.stringify(attributes), err => {
                    if (err) {
                        return cb(err);
                    }

                    return cb(null, JSON.stringify(attributes));
                });
            });
        }

        return cb(null, res);
    });
}

function readFile(filename, cb) {
    fs.readFile(filename, (err, contents) => {
        if (err) {
            return cb(err);
        }

        contents = parseContents('' + contents);

        getFileMetadata(filename, (err, metadata) => {
            if (err) {
                return cb(err);
            }

            metadata = JSON.parse(metadata);

            Object.keys(metadata).forEach(key => {
                contents[key] = contents[key] || metadata[key];
            });

            return cb(null, contents);
        });
    });
}

function publishFiles(filenames, cb) {
    let jsonData = [];

    filenames.forEach(filename => {
        filename = path.resolve(inputDir, filename);

        readFile(filename, (err, data) => {
            if (err) {
                return cb(err);
            }

            jsonData.push(data);
            if (jsonData.length !== filenames.length) {
                return;
            }

            return cb(null, jsonData);
        });
    });
}

fs.readdir(inputDir, (err, filenames) => {
    let contentFilenames;

    if (err) {
        throw err;
    }

    contentFilenames = filenames.filter(filename => path.extname(filename) === inputExt);

    publishFiles(contentFilenames, (err, json) => {
        let outputAbsPath = path.resolve(outputDir, articlesOutput);

        if (err) {
            throw (err);
        }

        json = json.sort((a, b) => b.datetime - a.datetime);

        fs.writeFile(outputAbsPath, JSON.stringify(json));
    });
});
