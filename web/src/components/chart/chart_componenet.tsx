import React, { useEffect, useRef, useState } from 'react';
import CommonBtn from '../common_btn/common_btn';
import './chart.css';
import CustomChart, { chartType } from './custom_chart';

type ChartProps = {
    width?: string;
};

const ChartComponenet: React.FC<ChartProps> = ({ width }) => {
    const [isStarted, setIsStarted] = useState(false);

    const es = useRef<EventSource>();

    let chart: CustomChart;

    useEffect(() => {
        const model = {
            chartTitle: '테스트',
            type: chartType.line,
            data: { labels: [], data: [] }
        };

        chart = new CustomChart(model);

        return () => {
            chart?.dispose();
        };
    }, []);

    useEffect(() => {
        es.current = new EventSource("http://localhost:8080/sse/streaming/start");

        console.log({ es });

        es.current.onopen = (e) => {
            setIsStarted(true);
            console.log('[sse] open', { e });
        };

        es.current.onmessage = (event) => {
            console.log('[sse] message', { event });

            if (event.data === 'finished') {
                es.current?.close();
                return;
            }
            updateChart(event.data);
        };

        es.current.onerror = (err) => {
            console.log('[sse] error', { err });
        };

        return () => {
            unsubscribe();
        };
    }, []);

    const updateChart = (data: any) => {
        chart.updateChart(data);
    };

    const unsubscribe = async () => {
        es.current?.close();
        await fetch('http://localhost:8080/sse/streaming/stop');
    };

    return (
        <div>
            <div id='div_chart' style={{ '--width': width } as React.CSSProperties} />
            {isStarted && <CommonBtn margin='20px auto 0 auto' onClick={() => unsubscribe()}>stop</CommonBtn>}
        </div>
    );
};

export default ChartComponenet;