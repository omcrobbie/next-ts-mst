import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface PropTypes {
  lastUpdate: string;
  stop: Function;
  start: Function;
}
@observer
export class Index extends React.Component<PropTypes> {
  componentDidMount() {
    this.props.start();
  }
  render() {
    const { lastUpdate, stop } = this.props;
    return (
        <div>
          {lastUpdate.toString()}
          <p>Hello Next.js</p>
          <button onClick={() => stop()}>Stop timer</button>
        </div>
    )

  }

}
  
  export default inject(({store}) => ({
    lastUpdate: store.lastUpdate,
    stop: store.stop,
    start: store.start
  }))(Index);