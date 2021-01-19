import Vue from 'vue';
import { format } from 'date-fns';

Vue.filter('formatDate', (v, f) => {
    if (!v) return '';
    const dateValue = v instanceof Date ? v : new Date(v);
    const dateFormat = f || 'MMMM DD, YYYY';
    return format(dateValue, dateFormat);
});
