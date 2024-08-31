import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('zh-cn');

// 如果需要，你可以在这里添加更多的 dayjs 配置

export default dayjs;
