/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-05
 */

var fs = require('fs'),
    path = require('path'),
    moment = require('./vendor/moment/moment'),
    articlesDir = 'articles';

function parseContents(contents) {
    var parsed = {
            title: '',
            tags: [],
            content: ['']
        },
        mode = 'title',
        lastChar = null;

    contents = contents
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\t/g, ' ');

    Array.prototype.slice.call(contents)
        .forEach(function (c) {
            if (c === '\n' && lastChar === '\n') {
                switch (mode) {
                    case 'title':
                        parsed.title = parsed.title.trim();
                        mode = 'tags';
                        break;
                    case 'tags':
                        parsed.tags = parsed.tags.map(function (tag) {
                            return tag.trim();
                        });
                        mode = 'content';
                        break;
                    case 'content':
                        parsed.content.push('');
                }
            }

            if (c === '#' && mode === 'tags' && (lastChar === ' ' || lastChar === '\n')) {
                parsed[mode].push('');
                lastChar = c;
                return;
            }

            switch (mode) {
                case 'tags':
                case 'content':
                    parsed[mode][parsed[mode].length - 1] += c;
                    break;
                default:
                    parsed[mode] += c;
                    break;
            }

            lastChar = c;
        });

    parsed.content = parsed.content.map(function (content) { return content.trim(); });

    return parsed;
}

function getFileAttributes(filename, cb) {
    fs.stat(filename, cb);
}

function readFile(filename, cb) {
    fs.readFile(filename, function onReadFile(err, contents) {
        if (err) {
            return cb(err);
        }

        return cb(null, parseContents('' + contents));
    });
}

function publishFiles(filenames, cb) {
    var jsonData = [];

    filenames.forEach(function forEachFilename(filename) {
        filename = path.resolve(articlesDir, filename);

        getFileAttributes(filename, function (err, attributes) {
            readFile(filename, function (err, data) {
                if (err) {
                    return cb(err);
                }

                data.datetimeObj = attributes.birthtime;
                data.datetime = moment(attributes.birthtime).format('YYYY-MM-DD');
                data.month = moment(attributes.birthtime).format('MMM');
                data.date = moment(attributes.birthtime).format('DD');
                data.year = moment(attributes.birthtime).format('YYYY');
                data.time = moment(attributes.birthtime).format('HH:mm');

                jsonData.push(data);

                if (jsonData.length === filenames.length) {
                    return cb(null, jsonData);
                }
            });
        });
    });
}

fs.readdir(articlesDir, function (err, filenames) {
    if (err) {
        throw err;
    }
    publishFiles(filenames, function (err, json) {
        var outputAbsPath = path.resolve('prebuilt', 'articles.json');

        if (err) {
            throw (err);
        }

        json = json
            .sort(function (a, b) {
                return b.datetimeObj - a.datetimeObj;
            });

        fs.writeFile(outputAbsPath, JSON.stringify(json));
    });
});
