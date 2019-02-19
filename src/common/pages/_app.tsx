

import { Provider } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import App, { Container } from "next/app";
import React from "react";
import initStore from "../store";
import { connectReduxDevtools } from 'mst-middlewares';



class MyApp extends App {


  public static async getInitialProps({ Component, ctx }) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isServer = (typeof window === "undefined");
    const store = initStore(isServer);
    //
    // Check whether the page being rendered by the App has a
    // static getInitialProps method and if so call it
    //
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps,
    };
  }

  private store;
  private props;

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.initialState);
    connectReduxDevtools(require('remotedev'), this.store);
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default MyApp;
