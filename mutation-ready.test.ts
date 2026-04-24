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

  it('should not call callback twice for the same element', () => {
    const callback = jest.fn();
    const div = document.createElement('div');
    div.className = 'test-element';
    document.body.appendChild(div);

    mutationReady('.test-element', callback);
    mutationReady('.test-element', callback);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should call callback for each matching element already in DOM', () => {
    const callback = jest.fn();
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    div1.className = 'test-element';
    div2.className = 'test-element';
    document.body.appendChild(div1);
    document.body.appendChild(div2);

    mutationReady('.test-element', callback);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(div1);
    expect(callback).toHaveBeenCalledWith(div2);
  });

  it('should call callback when a new element is added to the DOM', async () => {
    const callback = jest.fn();
    mutationReady('.dynamic-element', callback);
    expect(callback).not.toHaveBeenCalled();

    const div = document.createElement('div');
    div.className = 'dynamic-element';
    document.body.appendChild(div);

    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(div);
  });

  it('should call callback for a new element but not re-fire for the same element node', async () => {
    const callback = jest.fn();
    const div = document.createElement('div');
    div.className = 'payment-method';

    mutationReady('.payment-method', callback);

    document.body.appendChild(div);
    await Promise.resolve();
    expect(callback).toHaveBeenCalledTimes(1);

    document.body.removeChild(div);
    document.body.appendChild(div);
    await Promise.resolve();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call callback again when a fresh element with the same selector is added', async () => {
    const callback = jest.fn();
    const div1 = document.createElement('div');
    div1.className = 'payment-method';

    mutationReady('.payment-method', callback);

    document.body.appendChild(div1);
    await Promise.resolve();
    expect(callback).toHaveBeenCalledTimes(1);

    document.body.removeChild(div1);
    const div2 = document.createElement('div');
    div2.className = 'payment-method';
    document.body.appendChild(div2);
    await Promise.resolve();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(div2);
  });
});
