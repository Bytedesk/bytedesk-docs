/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-08-07 12:21:40
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-08-07 12:22:48
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
// 
import React from 'react';
import Layout from '@theme/Layout';

// https://docusaurus.io/zh-CN/docs/creating-pages
// http://localhost:9008/docs/zh-CN/helloReact
export default function Hello() {
    return (
        <Layout title="Hello" description="Hello React Page">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    fontSize: '20px',
                }}>
                <p>
                    Edit <code>pages/helloReact.ts</code> and save to reload.
                </p>
            </div>
        </Layout>
    );
}
