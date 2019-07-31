// tslint:disable: no-console
import { app } from './app';
import { loadData } from './store';

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(
        'App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env'),
    );
    try {
        loadData();
    } catch (e) {
        console.log(e);
    }
    console.log('Press CTRL-C to stop\n');
});
