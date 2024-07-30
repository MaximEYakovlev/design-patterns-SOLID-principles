interface ISubject {
    request(): void;
}

interface IAccessControl {
    verifyAccess(): boolean;
}

interface ILogger {
    logRequest(): void;
}

class Subject implements ISubject {
    public request(): void {
        console.log('Subject: request handling');
    }
}

class AccessControl implements IAccessControl {
    public verifyAccess(): boolean {
        return true;
    }
}

class Logger implements ILogger {
    public logRequest(): void {
        console.log('Proxy: request logging');
    }
}

class SubjectProxy implements ISubject {
    private subject: ISubject;
    private accessControl: IAccessControl;
    private logger: ILogger;

    constructor(subject: ISubject, accessControl: IAccessControl, logger: ILogger) {
        this.subject = subject;
        this.accessControl = accessControl;
        this.logger = logger;
    }

    public request(): void {
        const accessVerification = this.accessControl.verifyAccess();

        if (accessVerification) {
            console.log('Proxy: access granted');

            this.subject.request();
            this.logger.logRequest();
        } else {
            console.log('Proxy: access denied');
        }
    }
}

// client code
const clientCode = (subject: ISubject): void => {
    subject.request();
}

const subject = new Subject();
const accessControl = new AccessControl();
const logger = new Logger();
const subjectProxy = new SubjectProxy(subject, accessControl, logger);

clientCode(subject);
clientCode(subjectProxy);