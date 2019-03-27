#ifndef NOTIFYEVENT_H_INCLUDED
#define NOTIFYEVENT_H_INCLUDED

#include <unistd.h>
#include <stdio.h>
#include <sys/inotify.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <string.h>
#include <pwd.h>

#define EVENT_SIZE  ( sizeof (struct inotify_event) )
#define LWFB_Path "/tmp/lwfb"

extern FILE *Lwfb;

int initEvent();
int waitForEvent();


#endif // NOTIFYEVENT_H_INCLUDED
