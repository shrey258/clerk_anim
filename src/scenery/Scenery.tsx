import type { ReactNode } from 'react'
import { Avatar } from './Avatar'
import { Calendar } from './Calendar'
import { Chat } from './Chat'
import { Chip } from './Chip'
import { Currency } from './Currency'
import { Note } from './Note'
import { Phrase } from './Phrase'
import { Polaroid } from './Polaroid'
import { Receipt } from './Receipt'
import { StampBook } from './StampBook'
import { Steps } from './Steps'
import { SubwayMap } from './SubwayMap'
import { Ticket } from './Ticket'
import { Weather } from './Weather'

const CARDS: Record<number, ReactNode> = {
  2: <Chat name="Inês" status="Lisbon, 22:14" messages={[{ text: 'Landed??' }, { me: true, text: 'Yes! 06:15, Haneda is spotless' }, { text: 'Bring me Kit Kats' }, { me: true, text: 'Sake flavour, obviously' }]} />,
  7: <Phrase jp="すみません" romaji="sumimasen" en="excuse me" />,
  9: <Note title="Packing" items={['Passport', 'Adapter, type A', 'Film camera', 'Portra 400 × 3', 'Rain jacket', 'Suica card', 'Earplugs']} done={[0, 1, 2, 5]} />,
  10: <Chip text="Out of office" />,
  11: <Currency />,
  13: <Steps />,
  24: <Calendar />,
  25: <Weather />,
  27: <Polaroid scene="pumpkin" caption="Naoshima" date="23.10" />,
  36: <Ticket line="Shikoku Kisen ferry" from="Uno" to="Naoshima" details="23 Oct · 09:22 · 20 min" price="¥300" />,
  38: <Note title="Ramen to try" items={['Fuunji, Shinjuku', 'Afuri, Ebisu', 'Ichiran, Shibuya', 'Tsuta, Yoyogi']} done={[2]} />,
  41: <Receipt store="7-ELEVEN" place="Shimokitazawa 2-chome" items={[['Onigiri, salmon', '¥178'], ['Onigiri, tuna mayo', '¥168'], ['Egg sando', '¥298'], ['Royal milk tea', '¥162']]} total="¥806" when="17/10/2026 07:41" />,
  42: <Avatar initials="IN" color="#c58b6e" />,
  44: <Polaroid scene="torii" caption="Fushimi Inari" date="21.10" tilt={2} />,
  45: <Chip text="Tokyo +8h" />,
  46: <Ticket line="Keikyu line" from="Haneda" to="Shinagawa" details="17 Oct · 06:52 · 14 min" price="¥330" />,
  47: <SubwayMap />,
  58: <Phrase jp="ありがとう" romaji="arigatō" en="thank you" />,
  61: <StampBook />,
  62: <Phrase jp="おいしい" romaji="oishii" en="delicious" />,
  63: <Receipt store="ICHIRAN" place="Shibuya" items={[['Ramen, classic', '¥980'], ['Extra noodles', '¥210'], ['Soft egg', '¥140']]} total="¥1,330" when="18/10/2026 23:12" />,
  66: <Chat name="Mum" status="Lisbon, 09:30" messages={[{ text: 'Are you eating properly' }, { me: true, text: 'Ramen counts' }, { text: 'It does not' }, { me: true, text: 'Two eggs though' }]} />,
}

export function Scenery({ slot }: { slot: number }) {
  return CARDS[slot] ?? null
}
