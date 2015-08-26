# installation script

if [ "$(id -u)" != "0" ]; then
	echo "Sorry, you are not root."
	exit 1
fi


# dependencies
#debconf-set-selections <<< 'mysql-server mysql-server/root_password password ms_admin'
#debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password ms_admin'
apt-get -y install mysql-server=5.5.44-0ubuntu0.14.04.1
apt-get -y install python-pip
apt-get -y install apache2
apt-get install libapache2-mod-wsgi
apt-get install python-mysqldb
apt-get install python-dev
apt-get install libffi-dev

pip install setuptools==18.1

mkdir -p /etc/carsportal
cp sysconfig/carsportal.config /etc/carsportal

mkdir -p /var/www/carsportal
cp sysconfig/carsportal.wsgi /var/www/carsportal
cp sysconfig/apache_site.conf /etc/apache2/sites-enabled/carsportal.conf

mkdir -p /var/log/carsportal
touch /var/log/carsportal/carsportal.log
chown www-data:www-data /var/log/carsportal/carsportal.log


python setup.py install
python -c "from carsportal.db.data.populate import populate;populate()"


service apache2 restart
service rsyslog restart