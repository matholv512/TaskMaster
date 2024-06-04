export default function formatDate() {
    const dateField = document.querySelectorAll('.finalDate');
    if (dateField) {
        dateField.forEach(val => {
            let date = val.textContent.split('-');
            const year = Number(date[0]);
            const month = Number(date[1]);
            const time = date[2].split('T')[1];
            const day = Number(date[2].split('T')[0]);

            date = [day, month, year, time];
            date = date.join('/');

            const lastSlashIndex = date.lastIndexOf('/');
            const finalDate = date.substring(0, lastSlashIndex) + ' ás ' + date.substring(lastSlashIndex + 1);
            val.textContent = finalDate;
        });
    }
}