import Vue from 'vue';
import { format } from 'date-fns';

Vue.filter('formatDate', (v, f) => {
    if (!v) return '';
    const dateValue = v instanceof Date ? v : new Date(v);
    const dateFormat = f || 'MMMM dd, yyyy';
    return format(dateValue, dateFormat);
});
