/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-05
 */

(function () {
    var articleTemplate = Handlebars.compile(document.getElementById('/templates/article').innerHTML);

    Handlebars.registerHelper('format', contentArray => marked(contentArray.join('\n\n')));
    Handlebars.registerHelper('month', date => moment(date).format('MMM'));
    Handlebars.registerHelper('date', date => moment(date).format('DD'));
    Handlebars.registerHelper('year', date => moment(date).format('YYYY'));

    superagent
        .get('prebuilt/articles.json')
        .end(function (err, res) {
            var script = document.createElement('script');
            res.body.forEach(function (article) {
                document.getElementsByTagName('main')[0].innerHTML += articleTemplate(article);
            });
            script.src = 'prebuilt/script.js';
            script.type = 'text/javascript';
            document.head.appendChild(script);
        });
})();
