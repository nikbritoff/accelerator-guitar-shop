import moment from 'moment';

moment.updateLocale('ru', {
  months : [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
    'августа', 'сентебря', 'октября', 'ноября', 'декабря',
  ],
});

export const convertCommentDate = (createAt: string): string => moment(createAt).locale('ru').format('D MMMM');
