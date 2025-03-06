import { mutationReady } from './mutation-ready';

describe('mutationReady', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should call callback when element is already in DOM', () => {
    const callback = jest.fn();
    const div = document.createElement('div');
    div.className = 'test-element';
    document.body.appendChild(div);

    mutationReady('.test-element', callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(div);
  });
});
