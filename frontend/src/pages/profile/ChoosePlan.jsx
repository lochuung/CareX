import React from "react";
import { myPlan } from "../../constants/profile";
const ChoosePlan = () => {
  return (
      <section className="flex min-h-screen flex-1 flex-col pt-6 max-md:pb-14 sm:px-14">
        <div className="w-full space-y-8">
          <h1 className="text-2xl font-bold">Kế hoạch 🧾</h1>
          <div className="flex flex-col justify-center items-center space-y-4">
            <h1 className="text-xl font-semibold italic">
              <span className="text-blue-600">Plan</span> your life,{" "}
              <span className="text-blue-600">Plan</span> your future
            </h1>
            <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {myPlan.map((item) => {
                return (
                  <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 hover:bg-slate-100 ">
                    <div class="relative">
                      <div className="flex flex-row gap-2 items-center justify-between">
                        <div className="flex flex-row gap-2 items-center">
                          <image
                            src={item.imagePlan}
                            width={40}
                            height={40}
                            alt={item.name}
                            className="rounded-full border-2"
                          />
                          <div className="flex-col flex text-sm">
                            <p className="font-semibold">{item.name}</p>
                            <span className="text-slate-400">
                              @{item.username}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs flex flex-col justify-center items-center gap-2">
                          <image
                            src={item.socialImage}
                            alt=""
                            width={15}
                            height={15}
                          />
                          <span>{item.dateSend}</span>
                        </div>
                      </div>

                      <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <p class="text-gray-700 dark:text-gray-300">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
  );
};

export default ChoosePlan;
