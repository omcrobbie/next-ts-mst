import { shallow, render } from 'enzyme';
import { Index } from '../src/common/pages';

describe('Index tests', () => {
    it('should render', () => {
        const props = {
            start: () => null,
            stop: () => null,
            lastUpdate: new Date('2/5/2019').toString()
        }
        const wrapped = render(<Index {...props} />);
        expect(wrapped).toMatchSnapshot();
    })
})