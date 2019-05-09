#include "notifyEvent.h"

static int InFd; // inotify file descruptor
static int Wd; //watch descriptor
FILE *Lwfb = NULL;

int setRight()
{
    struct passwd *pw;

    pw=getpwnam("debian");
    if(pw == NULL)
    {
        perror("Can't find user !\n");
        return -1;
    }

    if(chown(LWFB_Path, 0, pw->pw_uid)==-1)
    {
        perror("chown failed ! \n");
        return -1;
    }

    if(chmod(LWFB_Path, 0660)==-1)
    {
        perror("chmod failed ! \n");
        return -1;
    }
    return 0;
}

int initEvent()
{
    Lwfb = fopen(LWFB_Path, "w");
    fclose(Lwfb);

    if(setRight()==-1)
        return -1;

    InFd = inotify_init();
    if(InFd == -1)
        return -1;

    Wd = inotify_add_watch(InFd, LWFB_Path, IN_CLOSE_WRITE);
    if(Wd == -1)
    {
        perror("Could not add watch on /tmp/lwfb !\n");
        return -1;
    }
    return 0;
}

int waitForEvent()
{
    char buffer[EVENT_SIZE];
    int numRead = read(InFd, buffer, EVENT_SIZE);
    if(numRead != EVENT_SIZE)
    {
        perror("Did not read EVENT_SIZE of bytes !\n");
        return 1;
    }

    return 0;
}
