from genesis.api import *
from genesis.plugmgr import RepositoryManager
from genesis.utils import *

import time
import feedparser


class Updater (Component):
    name = 'updater'

    def on_starting(self):
        self.feed = {}

    def get_feed(self):
        return self.feed

    def run(self):
        rm = RepositoryManager(self.app.config)
        feed_url = feedparser.parse('http://ark-os.org/feed')

        while True:
            try:
                self.feed = {}
                rm.update_list()
                for e in feed_url.entries:
                    self.feed[e.title] = e.link
            except:
                pass
            time.sleep(60*60*12) # each 12 hrs
