import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quahk.s6e',
  appName: 'Quahk S6E',
  webDir: 'dist',
  bundledWebRuntime: false,
  "ios": {
    "scheme": "Quahk S6E"
  },
  "server": {
    "url": "http://localhost:3000",
    "cleartext": true
  },
};

export default config;
