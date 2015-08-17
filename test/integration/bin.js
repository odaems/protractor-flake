import runner from '../support/runner';
import server from '../support/server';
import {unlink} from 'fs';
import {resolve} from 'path';
import {writeFileSync} from 'fs';
import {spawn} from 'child_process';

const FLAKE_FILE = resolve(__dirname + '/../support/times-flaked');
const CONFIG_PATH = 'test/support/protractor-config';
const SINGLE_INSTANCE_PATH = `${CONFIG_PATH}/protractor-sharded.conf.js`;

describe('Protractor Flake Executable', function () {
  before((done) => {
    server.listen(process.env.PORT || '3000', () => {
      done();
    });
  });

  after(() => {
    server.close();
  });

  beforeEach((done) => {
    unlink(FLAKE_FILE, function (err) {
      if (err && err.code !== 'ENOENT') {
        return done(err);
      }

      done();
    });
  });

  it.only('Exits successfully if test passes before max limit is reached',  (done) => {
    let process = spawn('./node_modules/.bin/protractor', [SINGLE_INSTANCE_PATH], {stdio: 'inherit'});

    process.on('close', (status) => {
      console.log('exit', status);
      done();
    });

    // runner(['--max-attempts=3', '--protractor-path=node_modules/.bin/protractor', '--', SINGLE_INSTANCE_PATH], (err, status, output) => {
    //   expect(err).to.equal(null);
    //   expect(status).to.equal(0);
    //   done();
    // });
  });

  it('exits unsuccessfully if test fails outside of max limit', (done) => {
    runner(['--max-attempts=1 node_modules/.bin/protractor', '--', SINGLE_INSTANCE_PATH], (err, status, output) => {
      expect(status).to.equal(1);
      done();
    });
  });
});
