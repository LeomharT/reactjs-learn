import { App as AntApp, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Outlet } from 'react-router';

export default function App() {
	return (
		<ConfigProvider locale={zhCN} theme={{ cssVar: true }}>
			<AntApp>
				<Outlet />
			</AntApp>
		</ConfigProvider>
	);
}
