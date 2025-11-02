'use client'
import { Avatar } from '@/components/atoms/common/Avatar'
import { Button } from '@/components/atoms/common/Button'
import { Dialog } from '@/components/molecules/popovers/Dialog'
import { useNavigationBlocker } from '@/utils/hooks/useNavigationBlocker'

export default function Home() {
  const { isOpen, proceedNavigation, cancelNavigation } = useNavigationBlocker()

  return (
    <div>
      <Avatar username="wichal korybut wikora" />
      <Dialog
        name="navBlocker"
        isOpen={isOpen}
        title="Really?"
        setIsOpen={cancelNavigation}
        dialogActions={
          <>
            <Button onClick={proceedNavigation}>Allow</Button>
          </>
        }
      ></Dialog>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus reiciendis voluptates
      sint. Voluptatum molestiae aperiam porro cumque, beatae ducimus. Laborum pariatur ad
      consequatur vel dolor at culpa, dolores eius eaque adipisci voluptas perspiciatis quia
      assumenda, iure saepe expedita esse eos? Commodi, provident maxime distinctio nesciunt eveniet
      reiciendis itaque amet saepe quas aperiam ducimus nam odit quisquam harum eaque quos culpa
      iste. Laudantium iure aspernatur excepturi tenetur modi repudiandae id earum. Sed, ea
      accusamus. Odio ipsam culpa, fuga consequatur obcaecati ut qui quam, alias enim eius
      voluptatibus explicabo dicta in nostrum sapiente blanditiis totam, similique necessitatibus
      dolorem est vel? Quo quibusdam distinctio pariatur excepturi dicta? Unde saepe ullam
      architecto temporibus sint quo ipsum, repellendus ea placeat, deserunt harum cumque nesciunt
      dolor quasi, aliquam sequi ut officiis nostrum minus magni. Doloribus quaerat in reiciendis
      repudiandae? Quod minus delectus ducimus omnis quidem modi maxime consequuntur reprehenderit
      iusto, dolore, asperiores sit deserunt tenetur. Alias quisquam necessitatibus quaerat atque
      voluptates officiis obcaecati unde non autem. Ut ad qui ipsum libero ducimus suscipit eius.
      Impedit eos quo distinctio adipisci cum enim vel ipsa alias ducimus ipsum tempora, at eveniet
      qui nemo libero quidem quos excepturi praesentium incidunt aspernatur provident itaque iure
      laudantium? Perspiciatis quas, inventore modi ratione ducimus quasi neque deleniti aut commodi
      iure, esse, asperiores aperiam temporibus expedita nisi corrupti dolorem alias facilis
      assumenda natus et? Nobis voluptatum nihil doloremque facilis quibusdam quae, minus corporis
      reprehenderit veritatis, laborum explicabo blanditiis incidunt eveniet non cum! Sit illo, quo
      doloribus nihil ipsam inventore expedita porro non accusantium aut eos eligendi deserunt vero
      veritatis velit. Ducimus molestiae odit labore rem itaque, eum, incidunt ullam laudantium
      repudiandae exercitationem dolore maxime ad mollitia amet aperiam officia tempore nisi culpa
      architecto, laborum obcaecati atque? Porro optio dolores eius ut possimus autem veniam eos
      ducimus, accusantium sint laudantium dolor earum asperiores provident voluptates esse beatae
      exercitationem unde atque? Sed voluptates explicabo ex repudiandae minus illum, animi impedit
      temporibus cupiditate dolor molestias, repellat quia ad possimus iusto error deserunt eaque ea
      odio autem vitae unde rem! Commodi temporibus sint necessitatibus, ad magnam voluptates nulla
      accusantium! Enim nihil fugiat obcaecati id eius sunt. Facere, et numquam cum maxime libero,
      illo non delectus quae velit blanditiis dignissimos explicabo exercitationem. Earum
      dignissimos sequi voluptatem nostrum perspiciatis enim vitae similique corrupti est nisi ab
      nemo dicta minima, dolores nulla! Enim praesentium ab quidem error voluptate. Minima obcaecati
      voluptatum natus, ducimus amet laboriosam velit quaerat vel cum, perferendis reiciendis est
      tempore sit? Harum debitis aliquam, ullam nemo officia voluptas sunt a ducimus minus, sapiente
      dolor obcaecati similique ipsa! Harum, corrupti maiores? A non, placeat eaque labore
      doloremque laudantium. Debitis nesciunt ducimus, nisi fugiat aliquid eligendi esse accusamus?
      Et blanditiis vel esse. Rerum possimus cumque, unde magni voluptatem aliquid voluptas deserunt
      et tempore explicabo neque id at. Inventore consequuntur minus voluptatibus doloribus ipsam
      placeat velit cupiditate quae eligendi, ipsum, hic quo quibusdam id rem quam sapiente voluptas
      mollitia modi! Eligendi corporis maiores libero amet aut voluptatem rem ab aliquam, nesciunt
      ratione at quas perspiciatis dicta minima dolorum magni error quo officiis odio unde sequi!
      Quasi, illo? Quaerat, quod. Natus, assumenda culpa modi eum consectetur molestiae aspernatur
      labore doloremque, ratione cum, ullam laboriosam vel eveniet blanditiis quibusdam eius
      temporibus excepturi nostrum similique earum veritatis. Quis est maxime assumenda praesentium
      quae suscipit placeat ratione nemo temporibus. Ipsam assumenda perferendis saepe sequi
      corrupti quas facere amet repellat omnis quae maiores similique voluptates, ad reprehenderit
      minus earum. Iusto iste debitis cupiditate, reiciendis, neque voluptates asperiores dolore
      culpa eos nesciunt sint magnam ullam ducimus totam facere autem nisi modi voluptatum eius
      aliquid quibusdam. Fugiat eveniet, magnam repellendus commodi consequatur soluta qui eligendi
      quas, nam molestiae culpa impedit iure in. Saepe, debitis libero labore earum laboriosam
      recusandae repudiandae quos animi aliquam totam aut asperiores unde beatae numquam minus
      facere perspiciatis aperiam cupiditate modi tenetur porro laudantium tempore provident
      quisquam? Dignissimos id similique esse ipsum, quod nulla. Explicabo cupiditate soluta, ut
      rerum vitae excepturi magni. Eligendi incidunt facere minima dolorum cupiditate quaerat dolore
      quidem vitae. Quo, dolorem vero eveniet placeat sint provident suscipit perspiciatis quod
      asperiores! Rem commodi molestias tempore in assumenda fuga voluptatum obcaecati velit,
      accusamus architecto error, quibusdam aut a doloremque quos facilis blanditiis. Illo non, nam
      repellendus quod delectus, impedit tempore culpa, sit est ipsum saepe harum ad nihil. Soluta
      dignissimos doloremque inventore, illum optio eius omnis commodi totam repudiandae unde
      delectus aspernatur temporibus, maxime, tenetur natus expedita sint. Dolorem, minima
      reiciendis est, adipisci ipsa quos deleniti officiis architecto sint sequi necessitatibus
      optio, numquam unde quasi praesentium? Recusandae perferendis deleniti quia corrupti numquam
      tempora, vitae aspernatur quidem, deserunt praesentium suscipit nemo sint ipsum blanditiis
      impedit. Atque incidunt pariatur quod sapiente sit deleniti ea! Delectus dolorem,
      exercitationem nemo alias quas sed, magnam voluptatibus culpa unde ex in eaque deleniti
      deserunt sunt, atque id aliquid officia necessitatibus quisquam iure corrupti temporibus
      placeat dolorum! Voluptatibus, esse?
    </div>
  )
}
