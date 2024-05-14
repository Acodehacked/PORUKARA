import React, { Component, useState, useRef, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';
import css from 'styled-jsx/css';
import { cn } from '@/lib/utils';
export default function ShadowScroller({ children , className ,orientation}: { children : React.ReactNode , className: string, orientation: "horizontal" | 'vertical'}) {
    const [ScrollTop, setScrollTop] = useState(0);
    const [ShadowTop, setShadowTop] = useState(0.0);
    const [side, setSide] = useState("top");
    const [ShadowBottom, setShadowBottom] = useState(0.0);
    const [scrollHeight, setScrollheight] = useState(0);
    const [clientHeight, seClientHeight] = useState(0);
    const ScrollBar = useRef(null);
    const shadowTop = useRef(null);
    const shadowBottom = useRef(null);
    useEffect(()=>{
        setSide((prev)=>{
            return orientation=='horizontal' ? 'right' : 'top'
        });
    },[orientation])
    const handleUpdate = (values: { scrollTop: number, scrollHeight: number, clientHeight: number }) => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        setShadowTop(shadowTopOpacity);
        setShadowBottom(shadowBottomOpacity);
    }
    return <div className={cn("overflow-hidden h-[300px] h-max-[400px]",className)}>
        <Scrollbars
            ref={ScrollBar}
            style={{overflowX:'hidden'}}
            className={cn(' modern_scrollbar',orientation=='horizontal'? 'overflow-y-hidden no-scrollbar show-flex': 'overflow-x-hidden')}
            onUpdate={handleUpdate} >
            {children}    
        </Scrollbars>
        <div
            ref={shadowTop}
            style={{ background: `linear-gradient(to ${side}, rgba(0, 0, 0, 0)  0%, rgba(255, 255, 255, 1) 100%)`,opacity: ShadowTop }}
            className={cn('absolute h-[20px]',orientation==="horizontal" ? "left-0 top-0 bottom-0" : 'right-0 left-0 top-0')} />
        <div
            ref={shadowBottom}
            style={{ background:   `linear-gradient(to ${side}, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%)`,opacity: ShadowBottom }}
            className={cn('absolute h-[20px]',orientation==="horizontal" ? "right-0 top-0 bottom-0" : 'right-0 left-0 bottom-0')} />
    </div>
}