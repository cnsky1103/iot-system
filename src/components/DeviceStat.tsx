import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Device, Message } from '../types/device';
import { getAllDevice, getAllMessages } from '../api/device';
import { formDateTime } from '../utils/date';
import { Radio } from 'antd';

interface Props {

}

enum Period {
    minute = 60, hour = 3600, day = 86400, week = 604800, month = 18144000
}

export const DeviceStat: React.FC<Props> = () => {
    const [devices, setDevices] = React.useState<Device[]>([])
    const [messages, setMessages] = React.useState<Message[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const devicemessage = {}
    const [option1, setOption1] = React.useState<any>({})
    const [option2, setOption2] = React.useState<any>({})
    const [option3, setOption3] = React.useState<any>({})
    const [period, setPeriod] = React.useState<Period>(Period.minute)

    const getOnlineAndOfflineDevice = () => {
        const date = new Date().getTime()
        const onlineCnt = devices.filter(d => date - formDateTime(d.updatedAt) < 5000).length
        let data: { value: number; name: string; }[] = []
        data.push({ value: onlineCnt, name: '在线设备' })
        data.push({ value: devices.length - onlineCnt, name: '不在线设备' })
        return data
    }

    const getPeriodData = () => {
        let t = (period === Period.minute || period === Period.hour || period === Period.day) ? 5 : 3

        let date = new Date().getTime()
        let data: number[] = [];
        for (let i = t - 1; i >= 0; --i) {
            let low = i * period * 1000;
            let high = (1 + i) * period * 1000
            data.push(messages.filter(m => {
                let diff = (date - formDateTime(m.createdAt))
                if (i === t - 1)
                    return diff > low
                else
                    return diff > low && diff < high
            }).length)
        }
        return data
    }

    React.useEffect(() => {
        getAllDevice().then(d => {
            setDevices(d);
            getAllMessages().then((res) => {
                setMessages(res);
                devices.forEach(d => {
                    devicemessage[d.clientId] = messages.filter(m => m.clientId === d.clientId)
                })
                setOption1(prev => {
                    return {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '1%',
                            right: '3%',
                            bottom: '2%',
                            top: '2%',
                            containLabel: true
                        },

                        xAxis: [
                            {
                                type: 'category',
                                data: devices.map(d => d.clientId),
                                axisTick: {
                                    alignWithLabel: true,

                                },
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                            }
                        ],

                        series: [
                            {
                                name: '消息数',
                                type: 'bar',
                                barWidth: '60%',
                                data: devices.map(d => devicemessage[d.clientId].length),
                                itemStyle: {
                                    normal: {
                                        //这里是重点
                                        color: (params) => {
                                            //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                            let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            },

                        ],
                        //triggerEvent: false // 设置为true后，可触发事件。实现x轴文字过长，显示省略号，hover上去显示全部的功能
                    }
                })
                setOption2({
                    series: [{
                        name: '在线设备信息',
                        type: 'pie',
                        radius: '55%',
                        data: getOnlineAndOfflineDevice()
                    }],
                    color: ['blue', 'red']
                })
                setOption3({
                    xAxis: {
                        type: 'category',
                        data: period === Period.minute ? ['更久', '4分钟前', '3分钟前', '2分钟前', '1分钟前']
                            : period === Period.hour ? ['更久', '4小时前', '3小时前', '2小时前', '1小时前']
                                : period === Period.day ? ['更久', '4天前', '3天前', '2天前', '1天前']
                                    : period === Period.week ? ['更久', '2周前', '1周前']
                                        : ['更久', '2个月前', '1个月前']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: getPeriodData(),
                        type: 'line'
                    }]
                })
                setLoading(false)
            }).catch(console.log)
        }).catch(console.log);
    }, [])

    React.useEffect(() => {
        const i = setInterval(() => {
            getAllDevice().then(d => {
                setDevices(d);
                getAllMessages().then((res) => {
                    setMessages(res);
                    devices.forEach(d => {
                        devicemessage[d.clientId] = messages.filter(m => m.clientId === d.clientId)
                    })
                    setOption1(prev => {
                        return {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '1%',
                                right: '3%',
                                bottom: '2%',
                                top: '2%',
                                containLabel: true
                            },

                            xAxis: [
                                {
                                    type: 'category',
                                    data: devices.map(d => d.clientId),
                                    axisTick: {
                                        alignWithLabel: true,

                                    },
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                }
                            ],

                            series: [
                                {
                                    name: '消息数',
                                    type: 'bar',
                                    barWidth: '60%',
                                    data: devices.map(d => devicemessage[d.clientId].length),
                                    itemStyle: {
                                        normal: {
                                            //这里是重点
                                            color: (params) => {
                                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                                let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                                                return colorList[params.dataIndex]
                                            }
                                        }
                                    }
                                },

                            ],
                            //triggerEvent: false // 设置为true后，可触发事件。实现x轴文字过长，显示省略号，hover上去显示全部的功能
                        }
                    })
                    setOption2({
                        series: [{
                            name: '在线设备信息',
                            type: 'pie',
                            radius: '55%',
                            data: getOnlineAndOfflineDevice()
                        }],
                        color: ['blue', 'red']
                    })
                    setOption3({
                        xAxis: {
                            type: 'category',
                            data: period === Period.minute ? ['更久', '4分钟前', '3分钟前', '2分钟前', '1分钟前']
                                : period === Period.hour ? ['更久', '4小时前', '3小时前', '2小时前', '1小时前']
                                    : period === Period.day ? ['更久', '4天前', '3天前', '2天前', '1天前']
                                        : period === Period.week ? ['更久', '2周前', '1周前']
                                            : ['更久', '2个月前', '1个月前']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: getPeriodData(),
                            type: 'line'
                        }]
                    })
                    setLoading(false)
                }).catch(console.log)
            }).catch(console.log);
        }, 1000)

        return () => { clearInterval(i) }
        // eslint-disable-next-line
    }, [option1, option2, option3])

    return (
        <div>
            {(!loading) &&
                <div>
                    <div><ReactEcharts option={option1} /></div>
                    <div><ReactEcharts option={option2} /></div>
                    <div>
                        <div><ReactEcharts option={option3} /></div>
                        <Radio.Group value={period} onChange={e => { setPeriod(e.target.value) }}
                            style={{ display: 'flex', justifyContent: 'center' }}>
                            <Radio value={Period.minute}>分钟</Radio>
                            <Radio value={Period.hour}>小时</Radio>
                            <Radio value={Period.day}>天</Radio>
                            <Radio value={Period.week}>周</Radio>
                            <Radio value={Period.month}>月</Radio>
                        </Radio.Group>
                    </div>
                </div>
            }
        </div>
    );
}