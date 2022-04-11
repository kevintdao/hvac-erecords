from django.core.mail import EmailMessage
from django.conf import settings


def send_technician_message(name, emailaddr):
    email = EmailMessage(
        'Team001HVAC',
        'Hello! Test',
        settings.EMAIL_HOST_USER,
        [email]
    )
    email.fail_silently = True
    email.send()

    return True
