import callHookLeave from '../utils/call-hook-leave';
import callHookEnter from '../utils/call-hook-enter';
import { VisitIntention, Visitor } from '../lib/types';
import { Ctx } from '@d0/core';

describe('call hooks on visitor', () => {
  it('should call an enter hook if it exists under object shape', () => {
    const visitor: Visitor<any> = {
      test: {
        enter: (node, info, ctx) => ({ node: `${node} ${info.name}${ctx}`, intention: 'PROCESS' }),
      },
    };

    let result = callHookEnter('test', 'hello', { name: 'world' }, '!!!' as any, visitor);
    expect(result).toEqual({ node: 'hello world!!!', intention: 'PROCESS' });
  });

  it('should call an enter hook by name if exist on enter structure', () => {
    const visitor: Visitor<string, string> = {
      enter: {
        test: (node, info, ctx) => ({ node: `${node} ${info.name}${ctx}`, intention: 'PROCESS' } as any),
      },
    };

    let result = callHookEnter('test', 'hello', { name: 'world' }, '!!!' as any, visitor);
    expect(result).toEqual({ node: 'hello world!!!', intention: 'PROCESS' });
  });

  it('should call an leave hook if it exists under object shape', () => {
    const visitor: Visitor<any> = {
      test: {
        leave: (node, info, ctx) => `${node} ${info.name}${ctx}`,
      },
    };

    let result = callHookLeave('test', 'hello', { name: 'world' }, '!!!' as any, visitor);
    expect(result).toBe('hello world!!!');
  });

  it('should call an leave hook by name if exist on leave structure', () => {
    const visitor: Visitor<any> = {
      leave: {
        test: (node, info, ctx) => `${node} ${info.name}${ctx}`,
      },
    };

    let result = callHookLeave('test', 'hello', { name: 'world' }, '!!!' as any, visitor);
    expect(result).toBe('hello world!!!');
  });
});
