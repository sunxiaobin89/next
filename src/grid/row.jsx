import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/**
 * Grid.Row
 * @order 1
 */
export default class Row extends Component {
    static propTypes = {
        prefix: PropTypes.string,
        pure: PropTypes.bool,
        rtl: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        /**
         * 行内容
         */
        children: PropTypes.node,
        /**
         * 列间隔
         */
        gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /**
         * 列在行中宽度溢出后是否换行
         */
        wrap: PropTypes.bool,
        /**
         * 行在某一断点下宽度是否保持不变（默认行宽度随视口变化而变化）
         */
        fixed: PropTypes.bool,
        /**
         * 固定行的宽度为某一断点的宽度，不受视口影响而变动
         * @enumdesc 320px, 480px, 720px, 990px, 1200px, 1500px
         */
        fixedWidth: PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl']),
        /**
         * （不支持IE9浏览器）多列垂直方向对齐方式
         * @enumdesc 顶部对齐, 居中对齐, 底部对齐, 按第一行文字基线对齐, 未设置高度或设为 auto，将占满整个容器的高度
         */
        align: PropTypes.oneOf(['top', 'center', 'bottom', 'baseline', 'stretch']),
        /**
         * （不支持IE9浏览器）行内具有多余空间时的布局方式
         * @enumdesc 左对齐, 居中对齐, 右对齐, 两端对齐，列之间间距相等, 每列具有相同的左右间距，行两端间距是列间距的二分之一
         */
        justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'space-around']),
        /**
         * 行在不同断点下的显示与隐藏<br><br>**可选值**:<br>true(在所有断点下隐藏)<br>false(在所有断点下显示)<br>'xs'(在 xs 断点下隐藏）<br>['xxs', 'xs', 's', 'm', 'l', 'xl'](在 xxs, xs, s, m, l, xl 断点下隐藏）
         */
        hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.array]),
        /**
         * 指定以何种元素渲染该节点
         * - 默认为 'div'
         */
        component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    };

    static defaultProps = {
        prefix: 'next-',
        pure: false,
        fixed: false,
        gutter: 0,
        wrap: false,
        component: 'div',
    };

    render() {
        /* eslint-disable no-unused-vars */
        const {
            prefix,
            pure,
            wrap,
            fixed,
            gutter,
            fixedWidth,
            align,
            justify,
            hidden,
            className,
            component: Tag,
            children,
            rtl,
            ...others
        } = this.props;
        /* eslint-enable no-unused-vars */

        let hiddenClassObj;
        if (hidden === true) {
            hiddenClassObj = { [`${prefix}row-hidden`]: true };
        } else if (typeof hidden === 'string') {
            hiddenClassObj = { [`${prefix}row-${hidden}-hidden`]: !!hidden };
        } else if (Array.isArray(hidden)) {
            hiddenClassObj = hidden.reduce((ret, point) => {
                ret[`${prefix}row-${point}-hidden`] = !!point;
                return ret;
            }, {});
        }

        const newClassName = cx({
            [`${prefix}row`]: true,
            [`${prefix}row-wrap`]: wrap,
            [`${prefix}row-fixed`]: fixed,
            [`${prefix}row-fixed-${fixedWidth}`]: !!fixedWidth,
            [`${prefix}row-justify-${justify}`]: !!justify,
            [`${prefix}row-align-${align}`]: !!align,
            ...hiddenClassObj,
            [className]: !!className,
        });

        let newChildren = children;
        const gutterNumber = parseInt(gutter, 10);
        if (gutterNumber !== 0) {
            const halfGutterString = `${gutterNumber / 2}px`;
            others.style = {
                marginLeft: `-${halfGutterString}`,
                marginRight: `-${halfGutterString}`,
                ...(others.style || {}),
            };
            newChildren = Children.map(children, child => {
                if (child && child.type && typeof child.type === 'function' && child.type.isNextCol) {
                    const newChild = cloneElement(child, {
                        style: {
                            paddingLeft: halfGutterString,
                            paddingRight: halfGutterString,
                            ...(child.style || {}),
                        },
                    });
                    return newChild;
                }

                return child;
            });
        }

        return (
            <Tag dir={rtl ? 'rtl' : 'ltr'} role="row" className={newClassName} {...others}>
                {newChildren}
            </Tag>
        );
    }
}
