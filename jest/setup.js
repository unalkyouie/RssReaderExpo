jest.mock('react-native-mmkv', () => ({
  MMKV: class {
    constructor() {}
    getString = jest.fn().mockReturnValue('[]');
    set = jest.fn();
    delete = jest.fn();
  }
}));

jest.mock('react-native-webview', () => 'WebView');