import {Inter} from 'next/font/google';
import {useState} from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [config, setConfig] = useState({});
  const [options, setOptions] = useState({});
  const [baseUrl, setBaseUrl] = useState('https://api.sumsub.com');

  function accessTokenExpirationHandler() {
    setAccessToken('');
    return Promise.reject();
  }

  function messageHandler(event: any) {
    // eslint-disable-next-line no-console
    console.log('messageHandler', event);
  }

  function errorHandler(event: any) {
    // eslint-disable-next-line no-console
    console.log('errorHandler', event);
  }

  return (
    <div className={inter.className}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="accessToken">Access Token</label>
          <input
            id="accessToken"
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="baseUrl">Base URL</label>
          <input
            id="baseUrl"
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="config">Config</label>
          <textarea
            id="config"
            value={JSON.stringify(config, null, 2)}
            onChange={(e) => setConfig(JSON.parse(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="options">Options</label>
          <textarea
            id="options"
            value={JSON.stringify(options, null, 2)}
            onChange={(e) => setOptions(JSON.parse(e.target.value))}
          />
        </div>
      </form>

      {accessToken && (
        <div>
          <SumsubWebSdk
            accessToken={accessToken}
            expirationHandler={accessTokenExpirationHandler}
            config={config}
            options={options}
            onMessage={messageHandler}
            onError={errorHandler}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </div>
  );
}
