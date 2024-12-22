import { expect } from '@assertive-ts/core';
import { UtcDate } from '../../src/types/UtcDate';

describe('UtcDate', () => {
    describe('constructor', () => {
        it('should create a UtcDate instance with the given components', () => {
            const date = new UtcDate(2023, 10, 5, 14, 30);
            expect(date.year).toBeEqual(2023);
            expect(date.month).toBeEqual(10);
            expect(date.day).toBeEqual(5);
            expect(date.hour).toBeEqual(14);
            expect(date.minute).toBeEqual(30);
        });
    });

    describe('now', () => {
        it('should return the current UtcDate', () => {
            const now = new Date();
            const utcNow = UtcDate.now;
            expect(utcNow.year).toBeEqual(now.getUTCFullYear());
            expect(utcNow.month).toBeEqual(now.getUTCMonth() + 1);
            expect(utcNow.day).toBeEqual(now.getUTCDate());
            expect(utcNow.hour).toBeEqual(now.getUTCHours());
            expect(utcNow.minute).toBeEqual(now.getUTCMinutes());
        });
    });

    describe('toDate', () => {
        it('should return a Date object representing the UtcDate', () => {
            const date = new UtcDate(2023, 10, 5, 14, 30);
            const jsDate = date.toDate;
            expect(jsDate.getUTCFullYear()).toBeEqual(2023);
            expect(jsDate.getUTCMonth()).toBeEqual(9); // Month is zero-based
            expect(jsDate.getUTCDate()).toBeEqual(5);
            expect(jsDate.getUTCHours()).toBeEqual(14);
            expect(jsDate.getUTCMinutes()).toBeEqual(30);
        });
    });

    describe('toIsoDate', () => {
        it('should return an ISO string representing the UtcDate', () => {
            const date = new UtcDate(2023, 10, 5, 14, 30);
            expect(date.toIsoDate).toBeEqual('2023-10-05T14:30:00.000Z');
        });
    });

    describe('encoded', () => {
        it('should return an encoded string representing the UtcDate', () => {
            let date = new UtcDate(2023, 10, 12, 14, 30);
            expect(date.encoded).toBeEqual('2023-10-12-14-30');
            date = new UtcDate(2023, 1, 1, 1, 1);
            expect(date.encoded).toBeEqual('2023-01-01-01-01');
        });
    });

    describe('fromDate', () => {
        it('should create a UtcDate from a Date object', () => {
            const jsDate = new Date(Date.UTC(2023, 9, 5, 14, 30));
            const date = UtcDate.fromDate(jsDate);
            expect(date.year).toBeEqual(2023);
            expect(date.month).toBeEqual(10);
            expect(date.day).toBeEqual(5);
            expect(date.hour).toBeEqual(14);
            expect(date.minute).toBeEqual(30);
        });
    });

    describe('fromIsoDate', () => {
        it('should create a UtcDate from an ISO string', () => {
            const date = UtcDate.fromIsoDate('2023-10-05T14:30:00.000Z');
            expect(date.year).toBeEqual(2023);
            expect(date.month).toBeEqual(10);
            expect(date.day).toBeEqual(5);
            expect(date.hour).toBeEqual(14);
            expect(date.minute).toBeEqual(30);
        });
    });

    describe('decode', () => {
        it('should decode an encoded string to a UtcDate', () => {
            const date = UtcDate.decode('2023-10-05-14-30');
            expect(date.year).toBeEqual(2023);
            expect(date.month).toBeEqual(10);
            expect(date.day).toBeEqual(5);
            expect(date.hour).toBeEqual(14);
            expect(date.minute).toBeEqual(30);
        });

        it('should return a default UtcDate for an invalid encoded string', () => {
            const date = UtcDate.decode('invalid-date');
            expect(date.year).toBeEqual(0);
            expect(date.month).toBeEqual(0);
            expect(date.day).toBeEqual(0);
            expect(date.hour).toBeEqual(0);
            expect(date.minute).toBeEqual(0);
        });
    });

    describe('setted', () => {
        it('should return a new UtcDate with the specified components set', () => {
            const date = new UtcDate(2023, 10, 5, 14, 30);
            const newDate = date.setted({
                year: 2024,
                month: 11
            });
            expect(newDate.year).toBeEqual(2024);
            expect(newDate.month).toBeEqual(11);
            expect(newDate.day).toBeEqual(5);
            expect(newDate.hour).toBeEqual(14);
            expect(newDate.minute).toBeEqual(30);
            const newDate2 = date.setted({
                day: 6,
                hour: 15,
                minute: 31
            });
            expect(newDate2.year).toBeEqual(2023);
            expect(newDate2.month).toBeEqual(10);
            expect(newDate2.day).toBeEqual(6);
            expect(newDate2.hour).toBeEqual(15);
            expect(newDate2.minute).toBeEqual(31);
        });
    });

    describe('advanced', () => {
        it('should return a new UtcDate advanced by the specified components', () => {
            const date = new UtcDate(2023, 10, 5, 14, 30);
            const newDate = date.advanced({
                year: 1,
                month: 2,
                day: 3,
                hour: 4,
                minute: 5
            });
            expect(newDate.year).toBeEqual(2024);
            expect(newDate.month).toBeEqual(12);
            expect(newDate.day).toBeEqual(8);
            expect(newDate.hour).toBeEqual(18);
            expect(newDate.minute).toBeEqual(35);
            const newDate2 = date.advanced({});
            expect(newDate2.year).toBeEqual(2023);
            expect(newDate2.month).toBeEqual(10);
            expect(newDate2.day).toBeEqual(5);
            expect(newDate2.hour).toBeEqual(14);
            expect(newDate2.minute).toBeEqual(30);
        });
    });

    describe('compare', () => {
        it('should compare two UtcDate instances correctly', () => {
            const date1 = new UtcDate(2023, 10, 5, 14, 30);
            const date2 = new UtcDate(2024, 10, 5, 14, 30);
            expect(date1.compare(date2)).toBeEqual('less');
            expect(date2.compare(date1)).toBeEqual('greater');
            expect(date1.compare(date1)).toBeEqual('equal');
        });

        it('should compare by year', () => {
            const date1 = new UtcDate(2023, 10, 5, 14, 30);
            const date2 = new UtcDate(2024, 10, 5, 14, 30);
            expect(date1.compare(date2)).toBeEqual('less');
            expect(date2.compare(date1)).toBeEqual('greater');
        });

        it('should compare by month', () => {
            const date1 = new UtcDate(2023, 10, 5, 14, 30);
            const date2 = new UtcDate(2023, 11, 5, 14, 30);
            expect(date1.compare(date2)).toBeEqual('less');
            expect(date2.compare(date1)).toBeEqual('greater');
        });

        it('should compare by day', () => {
            const date1 = new UtcDate(2023, 10, 5, 14, 30);
            const date2 = new UtcDate(2023, 10, 6, 14, 30);
            expect(date1.compare(date2)).toBeEqual('less');
            expect(date2.compare(date1)).toBeEqual('greater');
        });

        it('should compare by hour', () => {
            const date1 = new UtcDate(2023, 10, 5, 14, 30);
            const date2 = new UtcDate(2023, 10, 5, 15, 30);
            expect(date1.compare(date2)).toBeEqual('less');
            expect(date2.compare(date1)).toBeEqual('greater');
        });

        it('should compare by minute', () => {
            const date1 = new UtcDate(2023, 10, 5, 14, 30);
            const date2 = new UtcDate(2023, 10, 5, 14, 31);
            expect(date1.compare(date2)).toBeEqual('less');
            expect(date2.compare(date1)).toBeEqual('greater');
        });
    });

    describe('flatten', () => {
        it('should return the encoded string of the UtcDate', () => {
            const date = new UtcDate(2023, 10, 5, 14, 30);
            expect(date.flatten).toBeEqual('2023-10-05-14-30');
        });
    });
});
