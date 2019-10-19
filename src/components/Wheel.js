import React, { useState } from 'react';
import Roulette from 'react-roulette-game';
import './wheel.css'
import highlight_img from '../images/hightlight.png';
import pointer_img from '../images/pointer.png';
import roulette_img_under_highlight from '../images/rou_under_high.png';
import roulette_img_on_highlight from '../images/rou_on_high.png';

const Wheel = () => {
	const [prize, setPrize] = useState('');
	const [prizeImg, setPrizeImg] = useState('');
	const [showReward, setShowReward] = useState(false);

	const on_complete = (prize) => {
		setShowReward(true);
		switch (prize) {
			case '1000xu':
				setPrize('1000 Xu');
				setPrizeImg('1000xu.png');
				break;
			case '100xu':
				setPrize('100 Xu');
				setPrizeImg('100xu.png');
				break;
			case '500xu':
				setPrize('500 Xu');
				setPrizeImg('500xu.png');
				break;
			case '2000xu':
				setPrize('2000 Xu');
				setPrizeImg('2000xu.png');
				break;
			case 'mask':
				setPrize('Mặt nạ giấy innisfree');
				setPrizeImg('mask.png');
				break;
			case 'serum':
				setPrize('Serum Mamonde Red');
				setPrizeImg('serum.png');
				break;
			default: break;
		}
	}
	const roulette_props = {
		roulette_img_under_highlight,
		roulette_img_on_highlight,
		highlight_img,
		pointer_img,
		prize_arr: [
			'1000xu',
			'serum',
			'2000xu',
			'500xu',
			'100xu',
			'serum',
		],
		on_complete,
		has_reset: false,
		start_text: 'QUAY',
	};

	return (
		<>
			<div className='game-box'>
				<Roulette {...roulette_props} />
			</div>
			{showReward
				? <div>
					<div className="reward">
						<p>Chúc mừng bạn đã trúng {prize}</p>
						<img src={prizeImg} alt={prize}></img>
						<button className="btn-close" onClick={() => { setShowReward(false) }}>Đóng</button>
					</div>
					<div className="mask"></div>
				</div>
				: <div></div>
			}

		</>
	)
}

export default Wheel;