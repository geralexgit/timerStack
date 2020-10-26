declare namespace TimersListCssModule {
  export interface ITimersListCss {
    timersListItem: string;
  }
}

declare const TimersListCssModule: TimersListCssModule.ITimersListCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TimersListCssModule.ITimersListCss;
};

export = TimersListCssModule;
