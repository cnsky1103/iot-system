import React from 'react'

interface Props {

}

interface Footdata {
    title: string,
    linklist: {
        linktitle: string,
        link: string
    }[]
}

export const FooterComponent: React.FC<Props> = () => {
    const msg: Footdata[] = [
        {
            title: "开发记录",
            linklist: [{
                linktitle: "前端",
                link: "https://github.com/cnsky1103/iot-system"
            }, {
                linktitle: "后端",
                link: "https://www.baidu.com"
            }]

        },
        {
            title: "友情链接",
            linklist: [{
                linktitle: "React",
                link: "https://reactjs.org"
            }, {
                linktitle: "Express",
                link: "http://expressjs.com"
            }]
        }
    ]
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', backgroundColor: '#333' }}>
            {msg.map(value => {
                return (
                    <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                        <h4 style={{ color: '#fff' }}>{value.title}</h4>
                        <ul>
                            {value.linklist.map(linkvalue => {
                                return (
                                    <li style={{ color: '#fff', margin: '5px' }}>
                                        <a href={linkvalue.link} style={{ color: '#fff' }}>{linkvalue.linktitle}</a>
                                    </li>)
                            })}
                        </ul>
                    </div>
                )
            })}
        </div >
    );
}