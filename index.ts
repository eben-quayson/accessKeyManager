const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_ZcTU6blR4O7TNV2oguC",
    host: "pg-36bebe4d-quaysonebenezerawudzi-86d7.c.aivencloud.com",
    port: 22900,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUV9U/9Gy3NbgEaGFb8xJCexc1h98wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMDliN2U0OGYtM2NkNC00N2M5LTgwMjQtNTFmNjIzMmQx
ZWJjIFByb2plY3QgQ0EwHhcNMjQwNjE5MjI1MTUyWhcNMzQwNjE3MjI1MTUyWjA6
MTgwNgYDVQQDDC8wOWI3ZTQ4Zi0zY2Q0LTQ3YzktODAyNC01MWY2MjMyZDFlYmMg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAOfOcC+u
aIZyNYcteylJc7a7V2r42yxPJXatkIzxWA+X3ZcZZB0+CrNXkRWoanHX4A+QI0sk
lDDw/7qdP99Yptp2pHjBG192cFPVz0EaDjwx6vI4GsSvlGr0U36+SiEeQADU3SOG
S0rGA0/I6c7nbh3IBzUPvukTxP5v+XQoKoXyYf9tnm69YXF6BcbH99LZQvYwpcZC
CIcI1WfJyXfx3OnuPrSIbGt5Sjh1Qnekoa26zpxqqsfpw39ZgrcE01CvsHoUqUEm
AoieE7rgYMKYXraJY9jAt+W8IqJIrXFXLCxzaZ8L2p2JjNRtqpQYU1y5W5vOhjpV
V/87C1mvwZJWrOwR2q/lMmYVuoHgmx4W+3au+J8dutIMn2XMbDtDIkPHcbtWwMxR
sfRkx6k3Msl9hRYDBHiDH7pT7I2hJnjJaPqPSBJRfuqxssYiI29mPNJzc/bvT7kH
4A0p3eSJLmxngiqynU0q8n8Jc0yymGrfYtcIXY80VAbt4vD5V3yAaruhvQIDAQAB
oz8wPTAdBgNVHQ4EFgQUmuExl1QPfdosRno6DJMw9/O0QkIwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAMentrL94rIhulyp
Sj0XBT/l1vNIF88SfKgXOB1XHmKxWjrlh65OAHYNZvnWATGomYbnmKw9VXmylHYX
6mkVZQ6/M5Jutz5Sv7cOdy8I2123yu7XgqoOLKc+2uYFRrDT7cv67RiplrfTK5Z1
vp/xj8InojaSlW4MzhmuAY9hByVKk5seR1Jp3JzEYxgmpj+7Df23nUmc2i6FCCIc
gI/IV0QicvK9Any/Lbtmrv7TEA5MxgEBWPjNWm+8eOd+gdCs3aXeD/q9tE3afdb1
9fijPtoPyyQ1am4nfLSR2Sty4eCjv/B/wOXnn1jw8g28XKsTBBsVsVuFXsV+xavW
z5QLVEapQtGJN/g0bKiVlL6QEwiUGRqs/d/I0z11Tu/ckqI/iEgmLT6AIlJERHzl
glKUjklHk+ZQp0qMtIme389MH6gM8CWkCAiofC2+bl88MdRIXRgrGghg4qBAOh7I
6jj9daX9C8tj78Q4zy2rgBgGGMUPLqOqCOaHF9wXgVah/o4LFA==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});