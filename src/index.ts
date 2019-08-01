// tslint:disable: no-console
import { app } from './app';
import { loadData } from './store';
import { getConfig } from './utils/config';

const port = +(getConfig('PORT', 3000));
app.set('port', port);

app.listen(app.get('port'), async () => {
    try {
        console.log(
            'App is running at http://localhost:%d in %s mode',
            port,
            app.get('env'),
        );
        await loadData(port);
        console.log('Press CTRL-C to stop\n');
    } catch (e) {
        console.log(`Can't load data`);
    }
});
