declare namespace TimeFormCssModule {
  export interface ITimeFormCss {
    formInputs: string;
    timerForm: string;
  }
}

declare const TimeFormCssModule: TimeFormCssModule.ITimeFormCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TimeFormCssModule.ITimeFormCss;
};

export = TimeFormCssModule;
